import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginContext } from './loginContext.jsx';
import ErrorBoundary from './errorBoundary.jsx';
import { ThemeProvider, useTheme } from './src/theme/themeContext.jsx';

import Login from './src/pages/login/index.jsx';
import SignUp from './src/pages/signup/index.jsx';
import SendEmail from './src/pages/forgot-password/send-email.jsx';
import EnterOtp from './src/pages/forgot-password/enter-otp.jsx';
import ChangePassword from './src/pages/forgot-password/change-password.jsx';
import Language from './src/pages/language/index.jsx';
import Theme from './src/pages/theme/index.jsx';
import Help from './src/pages/help/index.jsx';
import Privacy from './src/pages/privacy/index.jsx';
import About from './src/pages/about/index.jsx';
import DownloadData from './src/pages/download-data/index.jsx';

// Student
import StudentDashboard from './src/pages/students/dashboard/index.jsx';
import StudentClasses from './src/pages/students/classes/index.jsx'; 
import StudentClassDetail from './src/pages/students/classes/class-detail/index.jsx';
import StudentMaterials from './src/pages/students/materials/index.jsx';
import StudentMaterialsDetail from './src/pages/students/materials/detail/index.jsx';
import StudentGrades from './src/pages/students/grades/index.jsx';
import StudentAttendance from './src/pages/students/attendance/index.jsx';
import StudentTasks from './src/pages/students/tasks/index.jsx';
import StudentTaskDetail from './src/pages/students/tasks/task-detail/index.jsx';
import StudentProfile from './src/pages/students/profile/index.jsx';
import StudentProfileEdit from './src/pages/students/profile/edit/index.jsx';
import StudentNotifications from './src/pages/students/notifications/index.jsx';
import StudentFullReport  from './src/pages/students/full-report/index.jsx';

const Stack = createStackNavigator();

function Navigator() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.bg },
            headerTintColor: colors.fg,
          }}
        >
          <Stack.Screen name="Login"          component={Login}          options={{ headerShown: false }} />
          <Stack.Screen name="SignUp"         component={SignUp}         options={{ headerShown: false }} />
          <Stack.Screen name="SendEmail"      component={SendEmail}      options={{ headerShown: false }} />
          <Stack.Screen name="EnterOtp"       component={EnterOtp}       options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="Language"       component={Language}       options={{ headerShown: false }} />
          <Stack.Screen name="Theme"          component={Theme}          options={{ headerShown: false }} />
          <Stack.Screen name="Help & Support" component={Help}           options={{ headerShown: false }} />
          <Stack.Screen name="Privacy Policy" component={Privacy}        options={{ headerShown: false }} />
          <Stack.Screen name="About"          component={About}          options={{ headerShown: false }} />
          <Stack.Screen name="Download my data" component={DownloadData} options={{ headerShown: false }} />

          {/* Student */}
          <Stack.Screen name="Student-Dashboard"     component={StudentDashboard}     options={{ headerShown: false }} />
          <Stack.Screen name="Student-Classes"       component={StudentClasses}       options={{ headerShown: false }} />
          <Stack.Screen name="Student-Classes-Detail" component={StudentClassDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Materials"     component={StudentMaterials}     options={{ headerShown: false }} />
          <Stack.Screen name="Student-Materials-Detail" component={StudentMaterialsDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Grades"        component={StudentGrades}        options={{ headerShown: false }} />
          <Stack.Screen name="Student-Attendance"    component={StudentAttendance}    options={{ headerShown: false }} />
          <Stack.Screen name="Student-Tasks"         component={StudentTasks}         options={{ headerShown: false }} />
          <Stack.Screen name="Student-Tasks-Detail"  component={StudentTaskDetail}    options={{ headerShown: false }} />
          <Stack.Screen name="Student-Profile"       component={StudentProfile}       options={{ headerShown: false }} />
          <Stack.Screen name="Student-Profile-Edit"  component={StudentProfileEdit}   options={{ headerShown: false }} />
          <Stack.Screen name="Student-Notifications" component={StudentNotifications} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Full-Report"   component={StudentFullReport}    options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function AppWrapper() {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState('');
  const [serverIp, setServerIp] = useState('192.168.1.1');
  const [user_id, setUser_id] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [national_id, setNational_id] = useState('');
  const [errorToken, setErrorToken] = useState('');
  const [form, setForm] = useState({});

  return (
    <ErrorBoundary>
      <ThemeProvider>
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
            form, setForm,
          }}
        >
          <Navigator />
        </LoginContext.Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});