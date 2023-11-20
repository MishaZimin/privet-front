import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './components/welcome.jsx';
import RegistrationISScreen from './components/registration/registration-IS.jsx';
import EmailScreen from './components/registration/email-confirmation.jsx';
import RegistrationBuddyScreen from './components/registration/registration-buddy.jsx';
import LogInForm from './components/log-in/log-in.jsx';
import StudentsScreen from './components/student/student.jsx';
import BuddysScreen from './components/buddy/buddy.jsx';
import PasswordRecoveryScreen from './components/log-in/password-recovery.jsx';
import SetNewPasswordScreen from './components/log-in/set-new-password.jsx';
import StudentProfileScreen from './components/student/Profile/student-profile.jsx';
import AllArrivalsScreen from './components/buddy/all-arrivals.jsx';
import BuddysStudentsScreen from './components/buddy/buddys-students.jsx';
import BuddyProfileScreen from './components/buddy/buddy-profile.jsx';
import ToDoListISScreen from './components/student/ToDoList/to-do-list-IS.jsx';
import ToDoListBuddyScreen from './components/buddy/ToDoList/to-do-list-buddy.jsx';
import RouteScreen from './components/student/Route/route.jsx';
import InfoScreen from './components/student/Info/info.jsx';
import MessengerScreen from './components/student/Messenger/messenger.jsx';
import ChangeLanguageScreen from './components/student/Profile/change-language.jsx';
import SettingScreen from './components/student/Profile/setting.jsx';
import SupportScreen from './components/registration/support.jsx';
import BuddyProfileForIS from './components/buddy/buddy-profile-for-IS.jsx'
import StudentProfileForBuddy from './components/student/Profile/student-profile-for-buddy.jsx'
import PaymentScreen from './components/student/ToDoList/payment.jsx';
import ArrivalBookingScreen from './components/student/ToDoList/arrival-booking.jsx';
import ArrivalSubmitted from './components/student/ToDoList/arrival-submitted.jsx';
import ArrivalBuddy from './components/buddy/arrival-buddy.jsx';
import MyArrivals from './components/buddy/my-arrivals.jsx';

import LoadingScreen from './components/loading.jsx';
import LoadingSettingISScreen from './components/loading-IS.jsx';
import LoadingSettingBuddyScreen from './components/loading-buddy.jsx';
import LanguageSelectionScreen from './components/language-selection.jsx';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Privet" >

                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

                <Stack.Screen name="LoadingSettingISScreen" component={LoadingSettingISScreen} />
                <Stack.Screen name="LoadingSettingBuddyScreen" component={LoadingSettingBuddyScreen} />

                <Stack.Screen name="LogInForm" component={LogInForm} />
                <Stack.Screen name="RegistrationISScreen" component={RegistrationISScreen} />
                <Stack.Screen name="RegistrationBuddyScreen" component={RegistrationBuddyScreen} />
                <Stack.Screen name="EmailScreen" component={EmailScreen} />
                <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
                <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
                <Stack.Screen name="SupportScreen" component={SupportScreen} />

                <Stack.Screen name="StudentsScreen" component={StudentsScreen} />
                <Stack.Screen name="BuddysScreen" component={BuddysScreen} />
                <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
                <Stack.Screen name="BuddyProfileScreen" component={BuddyProfileScreen} />
                <Stack.Screen name="ToDoListISScreen" component={ToDoListISScreen} />
                <Stack.Screen name="ToDoListBuddyScreen" component={ToDoListBuddyScreen} />
                <Stack.Screen name="RouteScreen" component={RouteScreen} />
                <Stack.Screen name="InfoScreen" component={InfoScreen} />
                <Stack.Screen name="MessengerScreen" component={MessengerScreen} />
                <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="AllArrivalsScreen" component={AllArrivalsScreen} />
                <Stack.Screen name="BuddysStudentsScreen" component={BuddysStudentsScreen} />
                <Stack.Screen name="BuddyProfileForIS" component={BuddyProfileForIS} />
                <Stack.Screen name="StudentProfileForBuddy" component={StudentProfileForBuddy} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="ArrivalBookingScreen" component={ArrivalBookingScreen} />
                <Stack.Screen name="ArrivalSubmitted" component={ArrivalSubmitted} />
                <Stack.Screen name="ArrivalBuddy" component={ArrivalBuddy} />
                <Stack.Screen name="MyArrivals" component={MyArrivals} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
