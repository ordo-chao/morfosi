import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { makeStyles } from './css.js';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../theme/themeContext.jsx';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>

          <Text style={styles.labelBar}>[ AUTH / SIGN UP ]</Text>

          <Text style={styles.title}>CREATE{'\n'}ACCOUNT</Text>
          <Text style={styles.subtitle}>
            One account. Sign in from any device. No newsletter, no noise.
          </Text>

          {/* ===== FORM ===== */}
          <View style={styles.inputContainer}>

            {/* Email */}
            <Text style={styles.label}>// EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={colors.placeholder}
              autoComplete="email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <Text style={styles.label}>// PASSWORD</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
                textContentType="newPassword"
                autoCapitalize="none"
                secureTextEntry={isPasswordHidden}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
              >
                <Ionicons
                  name={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.fgMuted}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.hint}>
              Min 8 chars · upper + lower · digit · special
            </Text>

            {/* Confirm Password */}
            <Text style={styles.label}>// CONFIRM PASSWORD</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
                textContentType="newPassword"
                autoCapitalize="none"
                secureTextEntry={isConfirmPasswordHidden}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                accessibilityLabel={isConfirmPasswordHidden ? 'Show password' : 'Hide password'}
              >
                <Ionicons
                  name={isConfirmPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={colors.fgMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Primary action */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.buttonText}>CREATE ACCOUNT →</Text>
            </TouchableOpacity>

            {/* Switch to login */}
            <Text style={styles.registerText}>
              Already have an account?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </Text>

            {/* ===== DIVIDER ===== */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* ===== SOCIAL ===== */}
            <View style={styles.continueContainer}>
              <TouchableOpacity
                style={styles.continue}
                onPress={() => navigation.navigate('Dashboard')}
              >
                <FontAwesome
                  name="google"
                  size={16}
                  color={colors.fg}
                  style={styles.socialIcon}
                />
                <Text style={styles.continueText}>SIGN UP WITH GOOGLE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continue}
                onPress={() => navigation.navigate('Dashboard')}
              >
                <FontAwesome
                  name="apple"
                  size={16}
                  color={colors.fg}
                  style={styles.socialIcon}
                />
                <Text style={styles.continueText}>SIGN UP WITH APPLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}