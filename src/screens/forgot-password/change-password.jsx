import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { makeStyles } from './css.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../theme/themeContext.jsx';

export default function ChangePassword({ navigation }) {
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


          <Text style={styles.labelBar}>[ AUTH / NEW PASSWORD ]</Text>

          <Text style={styles.title}>NEW{'\n'}PASSWORD</Text>
          <Text style={styles.subtitle}>
            Choose a password that meets the requirements below. You will be
            signed in automatically once it is saved.
          </Text>

          <View style={styles.inputContainer}>

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

          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>SAVE & SIGN IN →</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}