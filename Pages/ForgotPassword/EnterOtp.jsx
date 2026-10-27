import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { styles } from './css.js';

export default function EnterOtp({ route, navigation }) {
  const { email } = route.params || { email: 'example@email.com' };
  
  const [otpArray, setOtpArray] = useState(['', '', '', '']);

  // Create native focusing references for each individual box
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const refsArray = [firstInputRef, secondInputRef, thirdInputRef, fourthInputRef];

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
    console.log("Submitting complete OTP string:", finalOtpString);
    
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify</Text>

      <Image
        source={require('../../assets/images/verifyOtp.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.description}>
        A 4 digit OTP has been sent to {email}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your OTP:</Text>
        
        {/* The 4 Box Grid Wrapper */}
        <View style={styles.otpGridContainer}>
          {otpArray.map((digit, index) => (
            <TextInput
              key={index}
              ref={refsArray[index]}
              style={styles.otpInputBox}
              keyboardType="number-pad" // Shows pure numeric keyboard layout
              maxLength={1}
              value={digit}
              placeholder="-"
              placeholderTextColor="#ccc"
              textAlign="center"
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}