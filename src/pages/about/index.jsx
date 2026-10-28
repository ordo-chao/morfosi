// About.jsx
import React, { useCallback, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Linking, Platform, Clipboard,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const META = {
  schoolName: 'School Name',
  appName: 'Student Companion',
  version: '1.4.2',
  build: 240,
  released: 'Oct 2026',

  builtFor: 'School Name',
  poweredBy: 'Your Company',

  website: 'https://school.ac.ke',
  email: 'support@school.ac.ke',
  phone: '+254 20 555 0100',

  // For "Check for updates" — replace with your actual store IDs
  storeUrls: {
    ios:     'https://apps.apple.com/app/id1234567890',
    android: 'https://play.google.com/store/apps/details?id=com.yourcompany.schoolapp',
  },

  // Update check endpoint (optional). When set, we ask the server for the
  // latest version instead of opening the store immediately.
  updateEndpoint: null, // e.g. 'https://api.school.ac.ke/app/version'
  latestVersion: null,  // server response, populated on check
};

const CONNECT_LINKS = [
  { key: 'website', icon: 'globe-outline',  label: 'Website', value: 'school.ac.ke',     href: META.website },
  { key: 'email',   icon: 'mail-outline',   label: 'Email',   value: 'support@school.ac.ke', href: `mailto:${META.email}` },
  { key: 'phone',   icon: 'call-outline',   label: 'Phone',   value: '+254 20 555 0100', href: `tel:${META.phone.replace(/\s+/g, '')}` },
];

const LEGAL_LINKS = [
  { key: 'privacy',      icon: 'document-text-outline', label: 'Privacy policy',      route: 'Privacy' },
  { key: 'terms',        icon: 'document-text-outline', label: 'Terms of service',    route: 'Terms' },
  { key: 'licenses',     icon: 'document-text-outline', label: 'Open-source licenses', route: 'Licenses' },
];

/* -------------------- small components -------------------- */

function LinkRow({ icon, label, value, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}: ${value}` : label}
    >
      <Ionicons name={icon} size={16} color={colors.fg} />
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? (
        <Text style={styles.rowValue} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function About({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [checking, setChecking] = useState(false);

  /* ---- copy version to clipboard ---- */
  const copyVersion = useCallback(() => {
    const text = `${META.appName} ${META.version} (build ${META.build})`;
    try {
      Clipboard.setString(text);
      Alert.alert('Copied', text);
    } catch {
      // Clipboard may not exist on some platforms; silent fail is fine
    }
  }, []);

  /* ---- connect links ---- */
  const openLink = (href) => {
    Linking.openURL(href).catch(() =>
      Alert.alert('Could not open', href)
    );
  };

  /* ---- legal links ---- */
  const openLegal = (link) => {
    if (link.route) {
      navigation?.navigate(link.route);
    }
  };

  /* ---- check for updates ---- */
  const onCheckUpdates = async () => {
    if (checking) return;
    setChecking(true);
    try {
      // If you have an update endpoint, ask it; otherwise open the store.
      if (META.updateEndpoint) {
        const res = await fetch(META.updateEndpoint);
        const data = await res.json();
        const latest = data.latestVersion;

        if (latest && latest !== META.version) {
          Alert.alert(
            'Update available',
            `Version ${latest} is available. You're on ${META.version}.`,
            [
              { text: 'Later', style: 'cancel' },
              { text: 'Update', onPress: openStore },
            ]
          );
        } else {
          Alert.alert('Up to date', `You're on the latest version (${META.version}).`);
        }
      } else {
        openStore();
      }
    } catch (e) {
      Alert.alert('Could not check for updates', 'Please try again later.');
    } finally {
      setChecking(false);
    }
  };

  const openStore = () => {
    const url = Platform.OS === 'ios' ? META.storeUrls.ios : META.storeUrls.android;
    Linking.openURL(url).catch(() =>
      Alert.alert('Could not open store', url)
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
        <Text style={styles.headerTitle}>ABOUT</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HERO ===== */}
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.heroSchool}>{META.schoolName}</Text>
          <Text style={styles.heroApp}>{META.appName}</Text>
        </View>

        {/* ===== VERSION ===== */}
        <View style={styles.versionBlock}>
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>VERSION</Text>
            <TouchableOpacity
              onLongPress={copyVersion}
              delayLongPress={300}
              activeOpacity={0.7}
              accessibilityHint="Long-press to copy version"
            >
              <Text style={styles.versionValue}>
                {META.version} (build {META.build})
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.versionRow}>
            <Text style={styles.versionLabel}>RELEASED</Text>
            <Text style={styles.versionValue}>{META.released}</Text>
          </View>
        </View>

        {/* ===== BUILT BY ===== */}
        <Text style={styles.sectionTitle}>BUILT BY</Text>
        <View style={styles.textBlock}>
          <Text style={styles.builtLine}>
            Developed for <Text style={styles.builtStrong}>{META.builtFor}</Text>
          </Text>
          <Text style={styles.builtLine}>
            Powered by <Text style={styles.builtStrong}>{META.poweredBy}</Text>
          </Text>
        </View>

        {/* ===== CONNECT ===== */}
        <Text style={styles.sectionTitle}>CONNECT</Text>
        <View style={styles.listBlock}>
          {CONNECT_LINKS.map((item) => (
            <LinkRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              value={item.value}
              onPress={() => openLink(item.href)}
              colors={colors}
            />
          ))}
        </View>

        {/* ===== LEGAL ===== */}
        <Text style={styles.sectionTitle}>LEGAL</Text>
        <View style={styles.listBlock}>
          {LEGAL_LINKS.map((item) => (
            <LinkRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              onPress={() => openLegal(item)}
              colors={colors}
            />
          ))}
        </View>

        {/* ===== ACKNOWLEDGEMENTS ===== */}
        <Text style={styles.sectionTitle}>ACKNOWLEDGEMENTS</Text>
        <View style={styles.ackBlock}>
          <Text style={styles.ackText}>
            Thanks to our teachers, students, and parents who helped shape this app.
          </Text>
          <Text style={styles.ackMadeWith}>
            Made with <Text style={{ color: '#e25b5b' }}>❤️</Text> in Nairobi
          </Text>
        </View>

        {/* ===== CHECK FOR UPDATES ===== */}
        <TouchableOpacity
          style={[styles.updateBtn, checking && styles.updateBtnDisabled]}
          onPress={onCheckUpdates}
          disabled={checking}
          activeOpacity={0.7}
        >
          <Ionicons
            name={checking ? 'sync-outline' : 'cloud-download-outline'}
            size={14}
            color={checking ? colors.fgMuted : colors.buttonFg}
          />
          <Text
            style={[
              styles.updateBtnText,
              checking && styles.updateBtnTextDisabled,
            ]}
          >
            {checking ? 'CHECKING…' : 'CHECK FOR UPDATES'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          Version {META.version} · Build {META.build}
        </Text>
      </ScrollView>
    </View>
    </Layout>
  );
}