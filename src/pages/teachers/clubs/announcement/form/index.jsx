// src/pages/teachers/clubs/announcements/create/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Layout from '../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TEMPLATES = [
  { key: 'blank',      label: 'BLANK',       title: '', body: '' },
  { key: 'reminder',   label: 'REMINDER',    title: 'Reminder: ',  body: 'A quick reminder about…' },
  { key: 'results',    label: 'RESULTS',     title: 'Results',     body: 'Congratulations to…' },
  { key: 'logistics',  label: 'LOGISTICS',   title: 'Logistics update', body: 'Meeting details changed to…' },
];

export default function TeacherClubAnnouncementCreate({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const club = useMemo(
    () => ({ id: 'c1', name: 'Debate Club', ...(route?.params ?? {}) }),
    [route?.params],
  );

  const editing = route?.params?.announcement ?? null;

  const [title, setTitle]       = useState(editing?.text ?? '');
  const [body, setBody]         = useState(editing?.body ?? '');
  const [pinned, setPinned]     = useState(editing?.pinned ?? false);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const isValid = title.trim().length > 0 && body.trim().length > 0;
  const isEdit = !!editing;

  const applyTemplate = (tpl) => {
    setTitle(tpl.title);
    setBody(tpl.body);
  };

  const onSave = (publish) => {
    if (!isValid) return;
    // TODO: POST /api/teacher/clubs/:id/announcements
    Alert.alert(
      publish ? (isEdit ? 'Updated' : 'Posted') : 'Saved as draft',
      publish
        ? 'Members will be notified.'
        : 'You can publish later from the list.',
      [{ text: 'OK', onPress: () => navigation?.goBack() }],
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="close" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {isEdit ? 'EDIT ANNOUNCEMENT' : 'NEW ANNOUNCEMENT'}
          </Text>
          <TouchableOpacity
            onPress={() => onSave(true)}
            disabled={!isValid}
            hitSlop={8}
          >
            <Text style={[styles.headerAction, !isValid && { opacity: 0.4 }]}>
              POST
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Templates (create only) */}
          {!isEdit && (
            <>
              <Text style={styles.sectionLabel}>TEMPLATES</Text>
              <View style={styles.templateRow}>
                {TEMPLATES.map((tpl) => (
                  <TouchableOpacity
                    key={tpl.key}
                    style={styles.templateChip}
                    onPress={() => applyTemplate(tpl)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.templateChipText}>{tpl.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Title */}
          <Text style={styles.sectionLabel}>TITLE</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Short summary (e.g. Team announced)"
            placeholderTextColor={colors.placeholder}
            maxLength={120}
          />
          <Text style={styles.helper}>{title.length}/120</Text>

          {/* Body */}
          <Text style={styles.sectionLabel}>MESSAGE</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={body}
            onChangeText={setBody}
            placeholder="Write the announcement…"
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
            maxLength={2000}
          />
          <Text style={styles.helper}>{body.length}/2000</Text>

          {/* Options */}
          <Text style={styles.sectionLabel}>OPTIONS</Text>
          <View style={styles.optionBlock}>
            <View style={styles.optionRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionLabel}>Pin to top</Text>
                <Text style={styles.optionHint}>Shown first in the club detail</Text>
              </View>
              <Switch
                value={pinned}
                onValueChange={setPinned}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.optionRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionLabel}>Send push notification</Text>
                <Text style={styles.optionHint}>Alerts every member instantly</Text>
              </View>
              <Switch
                value={notifyPush}
                onValueChange={setNotifyPush}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.optionRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionLabel}>Also email members</Text>
                <Text style={styles.optionHint}>Uses the email on each member's profile</Text>
              </View>
              <Switch
                value={notifyEmail}
                onValueChange={setNotifyEmail}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* Draft */}
          <TouchableOpacity
            style={[styles.draftBtn, !isValid && { opacity: 0.4 }]}
            onPress={() => onSave(false)}
            disabled={!isValid}
            activeOpacity={0.7}
          >
            <Text style={styles.draftBtnText}>SAVE DRAFT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}