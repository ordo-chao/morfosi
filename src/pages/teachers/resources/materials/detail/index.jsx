// src/pages/teachers/resources/materials/detail/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Layout from '../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const BASE = {
  id: 'm1',
  title: 'Cell Structure — Chapter 3',
  category: 'notes',
  format: 'PDF',
  size: '1.2 MB',
  updated: '2 days ago',
  uploadedAt: 'Oct 25, 2026',
  status: 'published',
  classes: ['Biology · 10A', 'Biology · 10B'],
  views: 84,
  downloads: 41,
  description:
    'Covers the structure and function of plant and animal cells, including the cell membrane, cytoplasm, nucleus, mitochondria, chloroplasts, and vacuoles.',
  teacherNote:
    'Read pages 12–18 before our next lesson. Pay close attention to the diagrams — we will refer to them in the lab.',
  classStats: [
    { className: 'Biology · 10A', views: 48, downloads: 24 },
    { className: 'Biology · 10B', views: 36, downloads: 17 },
  ],
};

function StatCell({ value, label, tone, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, tone && { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function TeacherMaterialDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const material = useMemo(
    () => ({ ...BASE, ...(route?.params?.material ?? {}) }),
    [route?.params?.material],
  );

  const onEdit = () => navigation?.navigate('Teacher-Materials-Form', { material });
  const onDownload = () => Alert.alert('Download', 'Saved to device');
  const onShare = () => Alert.alert('Share', 'Wire to Share.share()');
  const onTogglePublish = () => {
    Alert.alert(
      material.status === 'published' ? 'Unpublish?' : 'Publish?',
      material.title,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'OK' }]
    );
  };
  const onDelete = () => {
    Alert.alert('Delete', `Delete "${material.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MATERIAL</Text>
          <TouchableOpacity onPress={onEdit} hitSlop={8}>
            <Feather name="edit-2" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Feather
                name={material.format === 'MP4' ? 'video' : 'file-text'}
                size={32}
                color={colors.accent}
              />
            </View>
            <Text style={styles.heroFormat}>{material.format} · {material.size}</Text>
            <Text style={styles.heroTitle}>{material.title}</Text>
            <View style={styles.statusWrap}>
              <View
                style={[
                  styles.statusPill,
                  { borderColor: material.status === 'published' ? '#4caf7d' : '#e0a93a' },
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    { color: material.status === 'published' ? '#4caf7d' : '#e0a93a' },
                  ]}
                >
                  {material.status.toUpperCase()}
                </Text>
              </View>
              {material.classes.length > 0 && (
                <Text style={styles.classesText}>{material.classes.length} classes</Text>
              )}
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statRow}>
            <StatCell value={material.views} label="VIEWS" colors={colors} />
            <StatCell value={material.downloads} label="DOWNLOADS" colors={colors} />
            <StatCell value={material.classes.length} label="CLASSES" colors={colors} />
            <StatCell
              value={`${Math.round((material.downloads / Math.max(1, material.views)) * 100)}%`}
              label="DL RATE"
              tone={colors.accent}
              colors={colors}
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={onTogglePublish} activeOpacity={0.7}>
              <Ionicons
                name={material.status === 'published' ? 'eye-off-outline' : 'eye-outline'}
                size={14}
                color={colors.fg}
              />
              <Text style={styles.actionBtnText}>
                {material.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={onDownload} activeOpacity={0.7}>
              <Ionicons name="download-outline" size={14} color={colors.fg} />
              <Text style={styles.actionBtnText}>DOWNLOAD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={onShare} activeOpacity={0.7}>
              <Ionicons name="share-outline" size={14} color={colors.fg} />
              <Text style={styles.actionBtnText}>SHARE</Text>
            </TouchableOpacity>
          </View>

          {/* Per-class stats */}
          {material.classStats.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>ENGAGEMENT BY CLASS</Text>
              <View style={styles.classStatBlock}>
                {material.classStats.map((s, i) => {
                  const pct = Math.round((s.downloads / Math.max(1, s.views)) * 100);
                  return (
                    <View key={i} style={styles.classStatRow}>
                      <Text style={styles.classStatName} numberOfLines={1}>{s.className}</Text>
                      <Text style={styles.classStatValue}>{s.views} views</Text>
                      <Text style={styles.classStatValue}>{s.downloads} dl</Text>
                      <Text style={[styles.classStatValue, { color: colors.accent }]}>{pct}%</Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Description */}
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.bodyText}>{material.description}</Text>

          {/* Teacher note */}
          {material.teacherNote ? (
            <>
              <Text style={styles.sectionTitle}>TEACHER'S NOTE</Text>
              <View style={styles.noteBlock}>
                <Text style={styles.noteText}>“{material.teacherNote}”</Text>
              </View>
            </>
          ) : null}

          {/* Danger */}
          <View style={styles.dangerRow}>
            <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
              <Text style={styles.dangerText}>DELETE MATERIAL</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}