import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';

export default function SendEmail({ navigation }) {
  const [email, setEmail] = useState('');

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


          <Text style={styles.labelBar}>[ AUTH / PASSWORD RESET ]</Text>

          <Text style={styles.title}>FORGOT{'\n'}PASSWORD</Text>
          <Text style={styles.subtitle}>
            Enter the email address associated with your account. We will send
            you a 4-digit code to verify it is you.
          </Text>

          <View style={styles.inputContainer}>
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
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EnterOtp', { email })}
          >
            <Text style={styles.buttonText}>SEND CODE →</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Remembered it?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.goBack()}
            >
              go back
            </Text>
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}