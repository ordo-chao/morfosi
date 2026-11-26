import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';

export default function EnterOtp({ route, navigation }) {
  const { email } = route.params || { email: 'example@email.com' };

  const [otpArray, setOtpArray] = useState(['', '', '', '']);

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const refsArray = [firstInputRef, secondInputRef, thirdInputRef, fourthInputRef];

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handleTextChange = (text, index) => {
    const newOtpArray = [...otpArray];
    newOtpArray[index] = text.slice(-1);
    setOtpArray(newOtpArray);

    if (text.length > 0 && index < 3) {
      refsArray[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otpArray[index] === '' && index > 0) {
      refsArray[index - 1].current.focus();
    }
  };

  const handleSubmitOtp = () => {
    const finalOtpString = otpArray.join('');
    console.log('Submitting complete OTP string:', finalOtpString);
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>


          <Text style={styles.labelBar}>[ AUTH / VERIFY CODE ]</Text>

          <Text style={styles.title}>ENTER{'\n'}CODE</Text>
          <Text style={styles.subtitle}>
            A 4-digit code has been sent to{' '}
            <Text style={styles.subtitleStrong}>{email}</Text>. It expires in 10
            minutes.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>// ONE-TIME CODE</Text>

            <View style={styles.otpGridContainer}>
              {otpArray.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={refsArray[index]}
                  style={[
                    styles.otpInputBox,
                    digit !== '' && styles.otpInputBoxFilled,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  placeholder="–"
                  placeholderTextColor={colors.fgFaint}
                  textAlign="center"
                  onChangeText={(text) => handleTextChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmitOtp}>
            <Text style={styles.buttonText}>VERIFY CODE →</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Didn't receive it?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('SendEmail')}
            >
              Resend
            </Text>
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}