import React, {useState } from 'react';
import { View, Text, TouchableOpacity, TextInput , Image } from 'react-native';
import { styles } from './css.js'; 

// Import the icon engines
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
  const { email, setEmail } = useState();
  const { password , setPassword } = useState();
  
  // State to manage password visibility toggle
  const [isPasswordPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

                  <Image
                    source={require('../../assets/images/Logo.png')}
                    style={styles.image}
                  />
      
      <View style={styles.inputContainer}>
        {/* Email Field */}
        <Text style={styles.label}>Enter your email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoComplete='email'
          placeholderTextColor="#999"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />

        {/* Password Field */}
        <Text style={styles.label}>Enter your password:</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#999"
            textContentType="password"
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

        <TouchableOpacity  onPress={() => navigation.navigate('SendEmail')}>
         <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
        
        {/* Social Authentication Wrapper */}
        <View style={styles.continueContainer}>
          <Text style={styles.orText}>Or</Text>
          
          <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate('Dashboard')}>
            <FontAwesome name="google" size={20} color="#000000" style={styles.socialIcon} />
            <Text style={styles.continueText}>Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate('Dashboard')}>
            <FontAwesome name="apple" size={20} color="#000000" style={styles.socialIcon} />
            <Text style={styles.continueText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}