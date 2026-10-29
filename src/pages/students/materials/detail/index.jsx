// MaterialDetail.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Linking,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- base material -------------------- */

// Merged with route params so partial material from the list still renders.
const BASE_MATERIAL = {
  id: 'default',
  title: 'Cell Structure — Chapter 3',
  subject: 'Biology',
  teacher: 'Mr. Otieno',
  room: 'Lab 2',
  format: 'PDF',        // PDF | PPTX | MP4 | DOCX | XLSX
  size: '1.2 MB',
  duration: null,       // for videos: '12:34'
  updated: '2 days ago',
  uploadedAt: 'Oct 25, 2026',
  category: 'notes',
  url: 'https://example.com/material.pdf',
  description:
    'Covers the structure and function of plant and animal cells, including the cell membrane, cytoplasm, nucleus, mitochondria, chloroplasts, and vacuoles. Includes labelled diagrams and a summary table for revision.',
  topics: [
    'Cell membrane & transport',
    'Organelle structure',
    'Plant vs animal cells',
    'Microscopy techniques',
  ],
  teacherNote:
    'Read pages 12–18 before our next lesson. Pay close attention to the diagrams — we will refer to them in the lab.',
};

/* -------------------- task builder -------------------- */

function slug(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function buildMaterial(partial = {}) {
  const merged = { ...BASE_MATERIAL, ...partial };

  // Fill in missing fields if a partial came in from the list
  merged.title = partial.title ?? BASE_MATERIAL.title;
  merged.subject = partial.subject ?? BASE_MATERIAL.subject;
  merged.teacher = partial.teacher ?? BASE_MATERIAL.teacher;
  merged.room = partial.room ?? BASE_MATERIAL.room;
  merged.format = partial.format ?? BASE_MATERIAL.format;
  merged.size = partial.size ?? BASE_MATERIAL.size;
  merged.duration = partial.duration ?? BASE_MATERIAL.duration;
  merged.updated = partial.updated ?? BASE_MATERIAL.updated;
  merged.uploadedAt = partial.uploadedAt ?? BASE_MATERIAL.uploadedAt;
  merged.category = partial.category ?? BASE_MATERIAL.category;

  if (!merged.url) {
    merged.url = `https://example.com/${slug(merged.title)}.${merged.format.toLowerCase()}`;
  }
  if (!merged.description) {
    merged.description = BASE_MATERIAL.description;
  }
  if (!merged.topics) {
    merged.topics = BASE_MATERIAL.topics;
  }
  if (merged.teacherNote === undefined) {
    merged.teacherNote = BASE_MATERIAL.teacherNote;
  }

  return merged;
}

/* -------------------- helpers -------------------- */

function formatIcon(format) {
  const map = {
    PDF:  'file-text',
    PPTX: 'file',
    DOCX: 'file',
    XLSX: 'grid',
    MP4:  'video',
  };
  return map[format] ?? 'file';
}

function formatLabel(format) {
  const map = {
    PDF:  'PDF DOCUMENT',
    PPTX: 'PRESENTATION',
    DOCX: 'DOCUMENT',
    XLSX: 'SPREADSHEET',
    MP4:  'VIDEO',
  };
  return map[format] ?? 'FILE';
}

/* -------------------- components -------------------- */

function MetaRow({ icon, label, value, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.metaRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function ActionButton({ icon, label, variant = 'primary', onPress, colors }) {
  const styles = makeStyles(colors);
  const isPrimary = variant === 'primary';
  const isDanger  = variant === 'danger';

  return (
    <TouchableOpacity
      style={[
        styles.actionBtn,
        isPrimary && styles.actionBtnPrimary,
        isDanger && styles.actionBtnDanger,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons
        name={icon}
        size={16}
        color={isPrimary ? colors.buttonFg : isDanger ? '#e25b5b' : colors.fg}
      />
      <Text
        style={[
          styles.actionText,
          isPrimary && styles.actionTextPrimary,
          isDanger && styles.actionTextDanger,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function MaterialDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const material = useMemo(
    () => buildMaterial(route?.params?.material ?? {}),
    [route?.params?.material]
  );

  const [downloaded, setDownloaded] = useState(false);

  /* ---- actions ---- */

  const onOpenInApp = () => {
    // Route by type — open a dedicated viewer screen
    if (material.format === 'MP4') {
      navigation?.navigate('VideoPlayer', { material });
    } else if (material.format === 'PDF') {
      navigation?.navigate('PdfViewer', { material });
    } else {
      // Office docs need a web preview / external app
      onOpenExternal();
    }
  };

  const onOpenExternal = () => {
    Linking.openURL(material.url).catch(() =>
      Alert.alert('Could not open', material.url)
    );
  };

  const onDownload = () => {
    // Wire to your download manager
    // await FileSystem.downloadAsync(material.url, localPath);
    setDownloaded(true);
    Alert.alert(
      'Download started',
      `${material.title} (${material.size}) will be saved to your device.`
    );
  };

  const onShare = () => {
    Alert.alert('Share', `Share ${material.title} — wire to Share.share()`);
  };

  const onReport = () => {
    Alert.alert(
      'Report material',
      'Flag this material as broken or inappropriate?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => {
          Alert.alert('Reported', 'The school has been notified.');
        } },
      ]
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MATERIAL</Text>
          <TouchableOpacity onPress={onReport} hitSlop={8}>
            <Ionicons name="flag-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== HERO ===== */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Feather
                name={formatIcon(material.format)}
                size={32}
                color={colors.accent}
              />
            </View>
            <Text style={styles.heroFormat}>{formatLabel(material.format)}</Text>
            <Text style={styles.heroTitle}>{material.title}</Text>
            <Text style={styles.heroMeta}>
              {material.subject} · {material.teacher}
              {material.duration ? ` · ${material.duration}` : ''}
            </Text>
          </View>

          {/* ===== ACTIONS ===== */}
          <View style={styles.actionsBlock}>
            <ActionButton
              icon={material.format === 'MP4' ? 'play' : 'eye-outline'}
              label={material.format === 'MP4' ? 'PLAY VIDEO' : 'OPEN IN APP'}
              variant="primary"
              onPress={onOpenInApp}
              colors={colors}
            />
            <View style={styles.actionsRow}>
              <ActionButton
                icon={downloaded ? 'checkmark-circle' : 'download-outline'}
                label={downloaded ? 'DOWNLOADED' : 'DOWNLOAD'}
                onPress={onDownload}
                colors={colors}
              />
              <ActionButton
                icon="share-outline"
                label="SHARE"
                onPress={onShare}
                colors={colors}
              />
            </View>
          </View>

          {/* ===== FILE META ===== */}
          <Text style={styles.sectionTitle}>FILE DETAILS</Text>
          <View style={styles.metaBlock}>
            <MetaRow icon="document-text-outline" label="Format"   value={material.format} colors={colors} />
            <MetaRow icon="cube-outline"            label="Size"     value={material.size} colors={colors} />
            <MetaRow icon="time-outline"            label="Updated"  value={material.updated} colors={colors} />
            <MetaRow icon="cloud-upload-outline"    label="Uploaded" value={material.uploadedAt} colors={colors} />
            <MetaRow icon="person-outline"          label="Teacher"  value={material.teacher} colors={colors} />
            <MetaRow icon="location-outline"        label="Room"     value={material.room} colors={colors} />
          </View>

          {/* ===== DESCRIPTION ===== */}
          <Text style={styles.sectionTitle}>ABOUT THIS MATERIAL</Text>
          <View style={styles.textBlock}>
            <Text style={styles.bodyText}>{material.description}</Text>
          </View>

          {/* ===== TOPICS ===== */}
          {material.topics?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>TOPICS COVERED</Text>
              <View style={styles.topicsBlock}>
                {material.topics.map((t, i) => (
                  <View key={i} style={styles.topicRow}>
                    <View style={styles.topicBullet} />
                    <Text style={styles.topicText}>{t}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* ===== TEACHER NOTE ===== */}
          {material.teacherNote ? (
            <>
              <Text style={styles.sectionTitle}>TEACHER'S NOTE</Text>
              <View style={styles.noteBlock}>
                <View style={styles.noteHeader}>
                  <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.accent} />
                  <Text style={styles.noteBy}>{material.teacher}</Text>
                </View>
                <Text style={styles.noteText}>{material.teacherNote}</Text>
              </View>
            </>
          ) : null}

          {/* ===== SUBJECT LINK ===== */}
          <TouchableOpacity
            style={styles.subjectLink}
            onPress={() =>
              navigation?.navigate('Student-Materials', {
                subject: {
                  name: material.subject,
                  teacher: material.teacher,
                  room: material.room,
                },
              })
            }
            activeOpacity={0.7}
          >
            <Text style={styles.subjectLinkText}>
              ← BACK TO ALL {material.subject.toUpperCase()} MATERIALS
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}