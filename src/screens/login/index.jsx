import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView ,Alert } from 'react-native';
import { makeStyles } from './css.js';
import { usePostHog } from 'posthog-react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { useTheme } from '../../theme/themeContext.jsx';


// import { Q } from 'nitromelondb';
import { Keychain } from '../../storage';
// import { database } from '../../database';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const posthog = usePostHog()
  const { colors } = useTheme();
  const styles = makeStyles(colors);

useEffect(() => {
  // const testDb = async () => {
  //   try {
  //     await database.write(async () => {
  //       await database.get('users').create((user) => {
  //         user.name = 'John Doe';
  //         user.email = 'john@example.com';
  //         user.avatar = null;
  //         user.createdAt = Date.now();
  //         user.updatedAt = Date.now();
  //       });
  //     });

  //     const users = await database.get('users').query().fetch();
  //     console.log(users)
  //   } catch (error) {
  //     console.error('Failed to create user:', error);
  //   }
  // };

  //   const login = async () => {
  //   try {
  //     const saved = await Keychain.saveCredentials(
  //       'prince@example.com',
  //       'sample-access-token',
  //     );

  //     if (saved) {
  //       Alert.alert('Success', 'Credentials saved securely.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Could not save credentials.');
  //   }
  // };



  // login();
}, []);





  const handlePress = () => {
        posthog.capture('button_pressed', {
            button_name: 'signin'
        })
        console.log('[PostHog Config]', {
  hasApiKey: Boolean(Config.POSTHOG_API_KEY),
  host: Config.POSTHOG_HOST,
});

        navigation.navigate('Teacher-Dashboard')
    }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>


          <Text style={styles.labelBar}>[ AUTH / SIGN IN ]</Text>

          <Text style={styles.title}>WELCOME</Text>
          <Text style={styles.subtitle}>
            Sign in to continue. New here? Create an account below.
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

            <Text style={styles.label}>// PASSWORD</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                textContentType="password"
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

            <TouchableOpacity onPress={() => navigation.navigate('SendEmail')}>
              <Text style={styles.forgotPassword}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress()}
            >
              <Text style={styles.buttonText}>SIGN IN →</Text>
            </TouchableOpacity>

            {/* <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign up
              </Text>
            </Text> */}

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

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
                <Text style={styles.continueText}>CONTINUE WITH GOOGLE</Text>
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
                <Text style={styles.continueText}>CONTINUE WITH APPLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}