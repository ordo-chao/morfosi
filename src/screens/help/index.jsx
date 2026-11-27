// Help.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Linking,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

// Top 4 — in production, pull from analytics (most-searched this week)
const QUICK_FAQS = [
  { key: 'submit',       icon: 'document-text-outline', title: 'How do I submit an assignment?' },
  { key: 'notifs',       icon: 'notifications-outline', title: "Why aren't I getting notifications?" },
  { key: 'password',     icon: 'lock-closed-outline',   title: 'I forgot my password' },
  { key: 'timetable',    icon: 'calendar-outline',      title: 'My timetable is wrong' },
];

const CONTACT = [
  {
    key: 'chat',
    icon: 'chatbubble-ellipses-outline',
    title: 'Chat with support',
    sub: 'Mon–Fri, 8 AM – 5 PM',
    meta: 'Usually 2h',
    action: 'chat',
  },
  {
    key: 'email',
    icon: 'mail-outline',
    title: 'Email us',
    meta: 'support@school.ac.ke',
    action: 'email',
    href: 'mailto:support@school.ac.ke',
  },
  {
    key: 'call',
    icon: 'call-outline',
    title: 'Call the school office',
    meta: '+254 20 555 0100',
    action: 'call',
    href: 'tel:+254205550100',
  },
];

const SYSTEM = {
  version: 'v1.4.2',
  build: 240,
  lastSynced: '2 minutes ago',
};

/* -------------------- small components -------------------- */

function FaqRow({ item, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <Ionicons name={item.icon} size={18} color={colors.accent} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function ContactRow({ item, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <Ionicons name={item.icon} size={18} color={colors.fg} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.sub ? <Text style={styles.cardSub}>{item.sub}</Text> : null}
      </View>
      {item.meta ? (
        <Text style={styles.cardMeta} numberOfLines={1}>
          {item.meta}
        </Text>
      ) : null}
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function SystemRow({ label, value, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.systemRow}>
      <Text style={styles.systemLabel}>{label}</Text>
      <Text style={styles.systemValue}>{value}</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Help({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [lastSynced, setLastSynced] = useState(SYSTEM.lastSynced);

  /* ---- actions ---- */

  const onFaqPress = (item) => {
    navigation?.navigate('FaqDetail', { key: item.key });
  };

  const onSeeAllFaqs = () => {
    navigation?.navigate('FaqList');
  };

  const onContactPress = (item) => {
    if (item.action === 'chat') {
      // Wire to in-app chat screen, or WhatsApp deep-link:
      // Linking.openURL('https://wa.me/254205550100?text=Hi%20support');
      navigation?.navigate('ChatDetail', { channel: 'support' });
      return;
    }
    if (item.href) {
      Linking.openURL(item.href).catch(() =>
        Alert.alert('Could not open', item.href)
      );
    }
  };

  const onReportBug = () => {
    navigation?.navigate('ReportBug', {
      context: {
        version: SYSTEM.version,
        build: SYSTEM.build,
        // In production, collect these before navigating:
        // deviceModel: DeviceInfo.getModel(),
        // osVersion: Platform.Version,
        // route: currentRoute,
        // userId: user.id,
        // logs: await getLastLogLines(20),
      },
    });
  };

  const onClearCache = () => {
    Alert.alert(
      'Clear cached data?',
      "You'll need internet to reload. Drafts and login are kept.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: wipe image cache, cached API responses, offline timetable
              // await AsyncStorage.multiRemove(['cache.*']); // scoped keys only
              // await FastImage.clearDiskCache(); // react-native-fast-image
              Alert.alert('Cache cleared', 'Content will refresh on next connection.');
            } catch (e) {
              Alert.alert('Could not clear cache', String(e));
            }
          },
        },
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
        <Text style={styles.headerTitle}>HELP & SUPPORT</Text>
        <TouchableOpacity
          onPress={() => navigation?.navigate('FaqList', { focusSearch: true })}
          hitSlop={8}
        >
          <Ionicons name="search" size={20} color={colors.fg} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== QUICK HELP ===== */}
        <Text style={styles.sectionTitle}>QUICK HELP</Text>
        <View style={styles.stack}>
          {QUICK_FAQS.map((item) => (
            <FaqRow
              key={item.key}
              item={item}
              onPress={() => onFaqPress(item)}
              colors={colors}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.linkButton} onPress={onSeeAllFaqs}>
          <Text style={styles.linkButtonText}>SEE ALL FAQS →</Text>
        </TouchableOpacity>

        {/* ===== CONTACT US ===== */}
        <Text style={styles.sectionTitle}>CONTACT US</Text>
        <View style={styles.stack}>
          {CONTACT.map((item) => (
            <ContactRow
              key={item.key}
              item={item}
              onPress={onContactPress}
              colors={colors}
            />
          ))}
        </View>

        {/* ===== REPORT A PROBLEM ===== */}
        <Text style={styles.sectionTitle}>REPORT A PROBLEM</Text>
        <View style={styles.stack}>
          <FaqRow
            item={{ key: 'bug', icon: 'bug-outline', title: 'Report a bug' }}
            onPress={onReportBug}
            colors={colors}
          />
        </View>

        {/* ===== SYSTEM ===== */}
        <Text style={styles.sectionTitle}>SYSTEM</Text>
        <View style={styles.systemBlock}>
          <SystemRow
            label="App version"
            value={`${SYSTEM.version} (build ${SYSTEM.build})`}
            colors={colors}
          />
          <SystemRow
            label="Last synced"
            value={lastSynced}
            colors={colors}
          />
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={onClearCache}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={14} color={colors.fg} />
            <Text style={styles.clearBtnText}>CLEAR CACHE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </Layout>
  );
}