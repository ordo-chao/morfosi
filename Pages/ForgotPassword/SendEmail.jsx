import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { styles } from './css.js';

export default function SendEmail({ navigation }) {
  // Setup standard local component state
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/getEmail.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.description}>
        Don’t worry! it happens. Please enter the email address associated with your account.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoComplete="email"
          placeholderTextColor="#999"
          textContentType="emailAddress"
          keyboardType="email-address" // Optimizes keyboard layout on Android/iOS
          value={email} // Binds the text value to state cleanly
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EnterOtp', { email: email })}
      >
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
}