import 'react-native-gesture-handler'; // Must remain at the very top
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Your Context
import { LoginContext } from './loginContext.jsx';
// Note: If ErrorBoundary uses web DOM elements, strip it out or replace it with a native error boundary package later.
import ErrorBoundary from './ErrorBoundary.jsx'; 

// Import Pages (Components)
import Login from './Pages/Login/index.jsx';
import SignUp from './Pages/SignUp/index.jsx';
import SendEmail from './Pages/ForgotPassword/SendEmail.jsx';
import EnterOtp from './Pages/ForgotPassword/EnterOtp.jsx';
import ChangePassword from './Pages/ForgotPassword/ChangePassword.jsx';


const Stack = createStackNavigator();

export default function AppWrapper() {
  // Mobile Fallback State Engine (Replacing sessionStorage for immediate execution)
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState('');
  const [serverIp, setServerIp] = useState('192.168.1.1'); // Hardcode fallback or local development IP
  const [user_id, setUser_id] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [national_id, setNational_id] = useState('');
  const [errorToken, setErrorToken] = useState('');
  const [form, setForm] = useState({});

  return (
    <ErrorBoundary>
      <LoginContext.Provider
        value={{
          userName, setUserName,
          phone, setPhone,
          email, setEmail,
          role, setRole,
          firstName, setFirstName,
          lastName, setLastName,
          token, setToken,
          serverIp, setServerIp,
          user_id, setUser_id,
          profile_pic, setProfile_pic,
          national_id, setNational_id,
          errorToken, setErrorToken,
          form, setForm
        }}
      >
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Login"
              screenOptions={{
                headerShown: true, // Shows top navigation title bar automatically
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#333333',
              }}
            >
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="SendEmail" component={SendEmail} options={{ headerShown: false }} />
              <Stack.Screen name="EnterOtp" component={EnterOtp} options={{ headerShown: false }} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </LoginContext.Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});