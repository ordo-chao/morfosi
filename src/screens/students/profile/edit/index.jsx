// ProfileEdit.jsx
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
  firstName: 'Amina',
  lastName: 'Wanjiku',
  email: 'amina.w@school.ac.ke',
  phone: '+254 712 345 678',
  dob: '12 March 2009',
  avatar: null, // null → initials fallback
};

/* -------------------- helpers -------------------- */

function initials(first, last) {
  const a = (first || '').trim()[0] || '';
  const b = (last || '').trim()[0] || '';
  return (a + b).toUpperCase();
}

// Basic validators — keep client-side simple; server is source of truth
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v) {
  return /^\+?[0-9\s\-()]{7,}$/.test(v.trim());
}

/* -------------------- small components -------------------- */

function Field({ label, value, onChangeText, keyboardType, autoCapitalize, hint, colors, locked, rightAction }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={[styles.input, locked && styles.inputLocked]}
          value={value}
          onChangeText={onChangeText}
          editable={!locked}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          placeholderTextColor={colors.placeholder}
          selectTextOnFocus={false}
        />
        {locked && (
          <Ionicons
            name="lock-closed"
            size={14}
            color={colors.fgMuted}
            style={styles.inputLock}
          />
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

export default function ProfileEdit({ navigation, route }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const initial = route?.params?.profile ?? INITIAL;

  const [firstName, setFirstName] = useState(initial.firstName ?? '');
  const [lastName, setLastName]   = useState(initial.lastName ?? '');
  const [email, setEmail]         = useState(initial.email ?? '');
  const [phone, setPhone]         = useState(initial.phone ?? '');
  const [avatarUri, setAvatarUri] = useState(initial.avatar ?? null);

  const dob = initial.dob ?? '12 March 2009';

  /* ---- derived state ---- */
  const dirty = useMemo(() => {
    return (
      firstName !== initial.firstName ||
      lastName !== initial.lastName ||
      email !== initial.email ||
      phone !== initial.phone ||
      avatarUri !== (initial.avatar ?? null)
    );
  }, [firstName, lastName, email, phone, avatarUri, initial]);

  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(phone);
  const canSave =
    dirty &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    phoneValid;

  /* ---- actions ---- */
  const onChangePhoto = () => {
    // Wire ImagePicker in production
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

  const onRequestDobChange = () => {
    navigation?.navigate('ProfileCorrection', {
      field: 'dateOfBirth',
      currentValue: dob,
    });
  };

  const onCancel = () => {
    if (!dirty) {
      navigation?.goBack();
      return;
    }
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
      avatar: avatarUri,
    };
    // TODO: POST to API, then update local context (LoginContext)
    Alert.alert('Saved', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ]);
    // navigation?.goBack(); // in prod, navigate after save resolves
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
        {/* ===== AVATAR ===== */}
        <Avatar
          uri={avatarUri}
          first={firstName}
          last={lastName}
          onChangePhoto={onChangePhoto}
          onRemovePhoto={onRemovePhoto}
          colors={colors}
        />

        {/* ===== EDITABLE FIELDS ===== */}
        <View style={styles.fieldsBlock}>
          <Field
            label="FIRST NAME"
            value={firstName}
            onChangeText={setFirstName}
            colors={colors}
          />
          <Field
            label="LAST NAME"
            value={lastName}
            onChangeText={setLastName}
            colors={colors}
          />

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

          {/* DOB — locked */}
          <Field
            label="DATE OF BIRTH"
            value={dob}
            locked
            colors={colors}
            hint="Locked — request a change from the school office"
            rightAction={{ label: 'REQUEST CHANGE →', onPress: onRequestDobChange }}
          />
        </View>

        {/* ===== LOCKED FIELDS NOTE ===== */}
        <View style={styles.lockedNote}>
          <View style={styles.lockedNoteHeader}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.fgMuted} />
            <Text style={styles.lockedNoteTitle}>LOCKED FIELDS</Text>
          </View>
          <Text style={styles.lockedNoteBody}>
            Admission number, class stream, date of birth, parents/guardians and dorm assignment are managed by the school. Contact the school office to request a correction.
          </Text>
        </View>

        {/* ===== SAVE ===== */}
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