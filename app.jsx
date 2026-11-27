import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDynamicIcon } from './src/hooks/use-dynamic-icon.js';
import { LoginContext } from './loginContext.jsx';
import ErrorBoundary from './errorBoundary.jsx';
import { ThemeProvider, useTheme } from './src/theme/themeContext.jsx';
import { posthog } from './src/config/posthog.js';
import { PostHogProvider } from 'posthog-react-native'

import Login from './src/screens/login/index.jsx';
import SignUp from './src/screens/signup/index.jsx';
import SendEmail from './src/screens/forgot-password/send-email.jsx';
import EnterOtp from './src/screens/forgot-password/enter-otp.jsx';
import ChangePassword from './src/screens/forgot-password/change-password.jsx';
import Language from './src/screens/language/index.jsx';
import Theme from './src/screens/theme/index.jsx';
import Help from './src/screens/help/index.jsx';
import Privacy from './src/screens/privacy/index.jsx';
import About from './src/screens/about/index.jsx';
import DownloadData from './src/screens/download-data/index.jsx';
import MemberList from './src/components/member-list/index.jsx';
import TeamDetail from './src/screens/students/campus/views/sports/team-detail/index.jsx';
import Fixtures from './src/screens/students/campus/views/sports/fixtures/index.jsx';

// Student
import StudentDashboard from './src/screens/students/dashboard/index.jsx';
import StudentClasses from './src/screens/students/classes/index.jsx'; 
import StudentClassDetail from './src/screens/students/classes/class-detail/index.jsx';
import StudentMaterials from './src/screens/students/materials/index.jsx';
import StudentMaterialsDetail from './src/screens/students/materials/detail/index.jsx';
import StudentGrades from './src/screens/students/grades/index.jsx';
import StudentAttendance from './src/screens/students/attendance/index.jsx';
import StudentTasks from './src/screens/students/tasks/index.jsx';
import StudentTaskDetail from './src/screens/students/tasks/task-detail/index.jsx';
import StudentProfile from './src/screens/students/profile/index.jsx';
import StudentProfileEdit from './src/screens/students/profile/edit/index.jsx';
import StudentNotifications from './src/screens/students/notifications/index.jsx';
import StudentFullReport  from './src/screens/students/full-report/index.jsx';
import StudentClubs from './src/screens/students/clubs/index.jsx';
import StudentClubsDetail from './src/screens/students/clubs/detail/index.jsx';
import StudentRevision from './src/screens/students/revision/index.jsx';
import StudentPastPapers from './src/screens/students/past-papers/index.jsx';
import StudentPastPapersDetail from './src/screens/students/past-papers/detail/index.jsx';
import StudentPastPaperAttempt from './src/screens/students/past-papers/attempt/index.jsx';
import StudentPastPaperReview from './src/screens/students/past-papers/review/index.jsx';
import StudentAiTutor from './src/screens/students/ai-tutor/index.jsx';
import StudentFlashcards from './src/screens/students/flashcards/index.jsx';
import StudentFlashcardsReview from './src/screens/students/flashcards/review/index.jsx';
import StudentProgress from './src/screens/students/progress/index.jsx';
import StudentCampus from './src/screens/students/campus/index.jsx';

// Teacher 
import TeacherDashboard from './src/screens/teachers/dashboard/index.jsx';
import TeacherTasks from './src/screens/teachers/tasks/index.jsx';
import TeacherTaskDetail from './src/screens/teachers/tasks/task-detail/index.jsx';
import TeacherTaskForm from './src/screens/teachers/tasks/task-form/index.jsx';
import TeacherClasses     from './src/screens/teachers/classes/index.jsx';
import TeacherClassDetail from './src/screens/teachers/classes/class-detail/index.jsx';
import TeacherProfile     from './src/screens/teachers/profile/index.jsx';
import TeacherProfileEdit from './src/screens/teachers/profile/edit/index.jsx';
import TeacherNotifications from './src/screens/teachers/notifications/index.jsx';
import TeacherClubs from './src/screens/teachers/clubs/index.jsx';
import TeacherClubsDetail from './src/screens/teachers/clubs/detail/index.jsx';
import TeacherClubManage from './src/screens/teachers/clubs/manage/index.jsx';
import TeacherClubAttendace from './src/screens/teachers/clubs/attendance/index.jsx';
import TeacherClubAnnouncements from './src/screens/teachers/clubs/announcement/index.jsx';
import TeacherClubAnnoucementsForm from './src/screens/teachers/clubs/announcement/form/index.jsx';
import TeacherClubEvent from './src/screens/teachers/clubs/event/index.jsx';
import TeacherResources from './src/screens/teachers/resources/index.jsx'
import TeacherMaterialsCreate       from './src/screens/teachers/resources/materials/form/index.jsx';
import TeacherMaterialDetail        from './src/screens/teachers/resources/materials/detail/index.jsx';
import TeacherQuestionCreate        from './src/screens/teachers/resources/question-bank/form/index.jsx'
import TeacherResponsibilites from './src/screens/teachers/responsibilities/index.jsx'
import TeacherAttendance from './src/screens/teachers/attendance/mark/index.jsx'
import TeacherGrades from './src/screens/teachers/grades/report/index.jsx'
import TeacherDepartmentTeachers  from './src/screens/teachers/department/teachers/index.jsx'
import TeacherDepartmentSchemes  from './src/screens/teachers/department/schemes/index.jsx'
import TeacherDepartmentPerformance  from './src/screens/teachers/department/performance/index.jsx'
import TeacherDormRollCall from './src/screens/teachers/dorm/roll-call/index.jsx'
import TeacherDormInspection from './src/screens/teachers/dorm/inspection/index.jsx'
const Stack = createStackNavigator();

function Navigator() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <PostHogProvider
        client={posthog}
        autocapture={{
          captureLifecycleEvents: true,
          captureScreens: false,
          captureTouches: true,
        }}
      >
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
          <Stack.Screen name="Member-List"    component={MemberList}    options={{ headerShown: false }} />

          {/* Campus */}
          <Stack.Screen name="Team-Detail"    component={TeamDetail}           options={{ headerShown: false }} />
          <Stack.Screen name="Fixtures"       component={Fixtures}             options={{ headerShown: false }} />

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
          <Stack.Screen name="Student-Clubs"         component={StudentClubs}          options={{ headerShown: false }} />
          <Stack.Screen name="Student-Clubs-Detail"  component={StudentClubsDetail}   options={{ headerShown: false }} />
          <Stack.Screen name="Student-Revision"      component={StudentRevision}      options={{ headerShown: false }} />
          <Stack.Screen name="Student-Past-Papers"   component={StudentPastPapers}    options={{ headerShown: false }} />
          <Stack.Screen name="Student-Past-Papers-Detail" component={StudentPastPapersDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Past-Papers-Attempt" component={StudentPastPaperAttempt} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Past-Papers-Review" component={StudentPastPaperReview} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Ai-Tutor"     component={StudentAiTutor}        options={{ headerShown: false }} />
          <Stack.Screen name="Student-Flashcards"   component={StudentFlashcards}    options={{ headerShown: false }} />
          <Stack.Screen name="Student-Flashcards-Review" component={StudentFlashcardsReview} options={{ headerShown: false }} />
          <Stack.Screen name="Student-Revision-Progress"     component={StudentProgress}      options={{ headerShown: false }} />
          <Stack.Screen name="Student-Campus"        component={StudentCampus}        options={{ headerShown: false }} />

          {/* Teacher */}
          <Stack.Screen name="Teacher-Dashboard"     component={TeacherDashboard}     options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Tasks"       component={TeacherTasks}       options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Task-Detail" component={TeacherTaskDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Tasks-Create" component={TeacherTaskForm} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Tasks-Edit" component={TeacherTaskForm} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Classes"     component={TeacherClasses}     options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Class-Detail" component={TeacherClassDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Profile" component={TeacherProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Profile-Edit" component={TeacherProfileEdit} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Notifications" component={TeacherNotifications} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Clubs" component={TeacherClubs} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Detail" component={TeacherClubsDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Manage" component={TeacherClubManage} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Attendance" component={TeacherClubAttendace} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Announcements" component={TeacherClubAnnouncements} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Announcements-Form" component={TeacherClubAnnoucementsForm} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Club-Event" component={TeacherClubEvent} options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Resources"          component={TeacherResources}        options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Materials-Form"   component={TeacherMaterialsCreate}  options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Material-Detail"    component={TeacherMaterialDetail}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Question-Form"    component={TeacherQuestionCreate}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Responsibilities"    component={TeacherResponsibilites}   options={{ headerShown: false }} />

          <Stack.Screen name="Teacher-Attendance-Mark"    component={TeacherAttendance}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Grades-Report"    component={TeacherGrades}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Department-Teachers"    component={TeacherDepartmentTeachers}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Department-Schemes"    component={TeacherDepartmentSchemes}   options={{ headerShown: false }} />
                    <Stack.Screen name="Teacher-Department-Performance"    component={TeacherDepartmentPerformance}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Dorm-RollCall"    component={TeacherDormRollCall}   options={{ headerShown: false }} />
          <Stack.Screen name="Teacher-Dorm-Inspection"    component={TeacherDormInspection}   options={{ headerShown: false }} />
        </Stack.Navigator>
        </PostHogProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function AppWrapper() {
  useDynamicIcon(); 
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