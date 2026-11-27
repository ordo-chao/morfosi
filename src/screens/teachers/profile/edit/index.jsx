// src/pages/teachers/profile/edit/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- initial values -------------------- */

const INITIAL = {
  firstName: 'Otieno',
  lastName: 'Omondi',
  email: 'otieno@school.ac.ke',
  phone: '+254 711 222 333',
  bio: 'Biology & General Science teacher. Homeroom for Form 3 A. Passionate about hands-on lab work.',
  officeHours: 'Tue & Thu · 3–4 PM',
  avatar: null,
};

/* -------------------- helpers -------------------- */

function initials(first, last) {
  const a = (first || '').trim()[0] || '';
  const b = (last || '').trim()[0] || '';
  return (a + b).toUpperCase();
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v) {
  return /^\+?[0-9\s\-()]{7,}$/.test(v.trim());
}

/* -------------------- small components -------------------- */

function Field({ label, value, onChangeText, keyboardType, autoCapitalize, hint, colors, locked, rightAction, multiline }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            locked && styles.inputLocked,
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={!locked}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          placeholderTextColor={colors.placeholder}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          selectTextOnFocus={false}
        />
        {locked && (
          <Ionicons name="lock-closed" size={14} color={colors.fgMuted} style={styles.inputLock} />
        )}
      </View>
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
      {rightAction ? (
        <TouchableOpacity onPress={rightAction.onPress} hitSlop={6}>
          <Text style={styles.fieldAction}>{rightAction.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function Avatar({ uri, first, last, onChangePhoto, onRemovePhoto, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.avatarBlock}>
      <View style={styles.avatarCircle}>
        {uri ? (
          <Image source={{ uri }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarInitials}>{initials(first, last) || '?'}</Text>
        )}
      </View>
      <View style={styles.avatarActions}>
        <TouchableOpacity style={styles.avatarBtn} onPress={onChangePhoto}>
          <Ionicons name="camera-outline" size={14} color={colors.fg} />
          <Text style={styles.avatarBtnText}>CHANGE PHOTO</Text>
        </TouchableOpacity>
        {uri ? (
          <TouchableOpacity style={styles.avatarBtn} onPress={onRemovePhoto}>
            <Ionicons name="trash-outline" size={14} color={colors.fg} />
            <Text style={styles.avatarBtnText}>REMOVE</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherProfileEdit({ navigation, route }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const initial = route?.params?.profile ?? INITIAL;

  const [firstName, setFirstName]     = useState(initial.firstName ?? '');
  const [lastName, setLastName]       = useState(initial.lastName ?? '');
  const [email, setEmail]             = useState(initial.email ?? '');
  const [phone, setPhone]             = useState(initial.phone ?? '');
  const [bio, setBio]                 = useState(initial.bio ?? '');
  const [officeHours, setOfficeHours] = useState(initial.officeHours ?? '');
  const [avatarUri, setAvatarUri]     = useState(initial.avatar ?? null);

  const dirty = useMemo(() => (
    firstName !== initial.firstName ||
    lastName  !== initial.lastName  ||
    email     !== initial.email     ||
    phone     !== initial.phone     ||
    bio       !== initial.bio       ||
    officeHours !== initial.officeHours ||
    avatarUri !== (initial.avatar ?? null)
  ), [firstName, lastName, email, phone, bio, officeHours, avatarUri, initial]);

  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(phone);
  const canSave =
    dirty &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    phoneValid;

  const onChangePhoto = () => {
    Alert.alert('Change photo', 'Open image picker');
    // setAvatarUri('file:///local/photo.jpg');
  };

  const onRemovePhoto = () => {
    Alert.alert('Remove photo', 'Use initials instead?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setAvatarUri(null) },
    ]);
  };

  const onVerifyEmail = () => {
    Alert.alert('Verify email', 'We will send a verification link.');
  };

  const onCancel = () => {
    if (!dirty) { navigation?.goBack(); return; }
    Alert.alert('Discard changes?', 'Your edits will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: () => navigation?.goBack() },
    ]);
  };

  const onSave = () => {
    if (!canSave) return;
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
      officeHours: officeHours.trim(),
      avatar: avatarUri,
    };
    // TODO: PATCH /api/teacher/profile with payload
    Alert.alert('Saved', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EDIT PROFILE</Text>
          <TouchableOpacity onPress={onCancel} hitSlop={8}>
            <Text style={styles.headerAction}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <Avatar
            uri={avatarUri}
            first={firstName}
            last={lastName}
            onChangePhoto={onChangePhoto}
            onRemovePhoto={onRemovePhoto}
            colors={colors}
          />

          {/* Editable fields */}
          <View style={styles.fieldsBlock}>
            <Field label="FIRST NAME" value={firstName} onChangeText={setFirstName} colors={colors} />
            <Field label="LAST NAME"  value={lastName}  onChangeText={setLastName}  colors={colors} />

            <Field
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              colors={colors}
              hint={!emailValid ? 'Enter a valid email address' : 'Used for school notices and login'}
              rightAction={{ label: 'VERIFY EMAIL →', onPress: onVerifyEmail }}
            />

            <Field
              label="PHONE"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              colors={colors}
              hint={!phoneValid ? 'Enter a valid phone number' : 'Used for OTP verification'}
            />

            <Field
              label="BIO"
              value={bio}
              onChangeText={setBio}
              multiline
              colors={colors}
              hint="Shown to students and parents on your public profile"
            />

            <Field
              label="OFFICE HOURS"
              value={officeHours}
              onChangeText={setOfficeHours}
              colors={colors}
              hint="When students/parents can reach you in person"
            />

            {/* Locked fields */}
            <Field
              label="STAFF NUMBER"
              value="TCH-2019-0142"
              locked
              colors={colors}
              hint="Locked — managed by the school HR office"
            />
            <Field
              label="SUBJECTS TAUGHT"
              value="Biology · General Science"
              locked
              colors={colors}
              hint="Request a change from the Head of Department"
            />
            <Field
              label="HOMEROOM"
              value="Form 3 A"
              locked
              colors={colors}
              hint="Assigned by the school administration"
            />
          </View>

          {/* Locked note */}
          <View style={styles.lockedNote}>
            <View style={styles.lockedNoteHeader}>
              <Ionicons name="lock-closed-outline" size={14} color={colors.fgMuted} />
              <Text style={styles.lockedNoteTitle}>LOCKED FIELDS</Text>
            </View>
            <Text style={styles.lockedNoteBody}>
              Staff number, subjects taught, homeroom assignment, class allocations and payroll
              details are managed by the school administration. Contact the school office to
              request a correction.
            </Text>
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
            onPress={onSave}
            disabled={!canSave}
            activeOpacity={0.7}
          >
            <Text style={[styles.saveText, !canSave && styles.saveTextDisabled]}>
              SAVE CHANGES
            </Text>
          </TouchableOpacity>

          <Text style={styles.footnote}>
            Changes to name or email may require admin approval and re-verification.
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
}