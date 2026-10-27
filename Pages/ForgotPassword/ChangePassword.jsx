import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './css.js';


import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChangePassword({ navigation }) {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State to manage password visibility toggle
  const [isPasswordPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

        <Text style={styles.description}>
         Now you can change your password
        </Text>

        {/* Password Field */}
        <Text style={styles.label}>Enter your password:</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
            textContentType="newPassword"
            secureTextEntry={isPasswordPasswordHidden}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsPasswordHidden(!isPasswordPasswordHidden)}
          >
            <Ionicons
              name={isPasswordPasswordHidden ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm your password:</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: special;"
            textContentType="newPassword"
            placeholderTextColor="#999"
            secureTextEntry={isPasswordPasswordHidden}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setIsConfirmPasswordHidden(!isPasswordPasswordHidden)}
          >
            <Ionicons
              name={isConfirmPasswordHidden ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
  );
}