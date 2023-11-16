import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectionScreen from './components/StartScreen/LanguageSelectionScreen.jsx';
import WelcomeScreen from './components/StartScreen/WelcomeScreen.jsx';
import RegistrationISScreen from './components/Registration/RegistrationISScreen.jsx';
import EmailScreen from './components/Registration/EmailScreen.jsx';
import LoadingScreen from './components/StartScreen/LodingScreen.jsx';
import RegistrationBuddyScreen from './components/Registration/RegistrationBuddyScreen.jsx';
import LogInForm from './components/LogIn/LogInScreen.jsx';
import StudentsScreen from './components/2.3/StudentsScreen.jsx';
import BuddysScreen from './components/2.4/BuddysScreen.jsx';
import PasswordRecoveryScreen from './components/LogIn/PasswordRecoveryScreen.jsx';
import SetNewPasswordScreen from './components/LogIn/SetNewPassword.jsx';
import StudentProfileScreen from './components/2.3/Profile/StudentProfileScreen.jsx';
import AllArrivalsScreen from './components/2.4/AllArrivalsScreen.jsx';
import BuddysStudentsScreen from './components/2.4/BuddysStudentsScreen.jsx';
import BuddyProfileScreen from './components/2.4/BuddyProfileScreen.jsx';
import ToDoListISScreen from './components/2.3/ToDoList/ToDoListISScreen.jsx';
import ToDoListBuddyScreen from './components/2.4/ToDoList/ToDoListBuddyScreen.jsx';
import RouteScreen from './components/2.3/Route/RouteScreen.jsx';
import InfoScreen from './components/2.3/Info/InfoScreen.jsx';
import MessengerScreen from './components/2.3/Messenger/MessengerScreen.jsx';
import ChangeLanguageScreen from './components/2.3/Profile/ChangeLanguageScreen.jsx';
import SettingScreen from './components/2.3/Profile/SettingScreen.jsx';
import LoadingSettingISScreen from './components/2.3/LoadingSettingISScreen.jsx';
import LoadingSettingBuddyScreen from './components/2.4/LoadingSettingBuddyScreen.jsx';
import SupportScreen from './components/Registration/SupportScreen.jsx';
import BuddyProfileForIS from './components/2.4/BuddyProfileForIS.jsx'
import StudentProfileForBuddy from './components/2.3/Profile/StudentProfileForBuddy.jsx'
import PaymentScreen from './components/2.3/ToDoList/PaymentScreen.jsx';
import ArrivalBookingScreen from './components/2.3/ToDoList/ArrivalBookingScreen.jsx';
import ArrivalSubmitted from './components/2.3/ToDoList/ArrivalSubmitted.jsx';
import ArrivalBuddy from './components/2.4/ArrivalBuddy.jsx';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Privet" >
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen name="LogInForm" component={LogInForm} />
                <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="RegistrationISScreen" component={RegistrationISScreen} />
                <Stack.Screen name="RegistrationBuddyScreen" component={RegistrationBuddyScreen} />
                <Stack.Screen name="EmailScreen" component={EmailScreen} />
                <Stack.Screen name="LoadingSettingISScreen" component={LoadingSettingISScreen} />
                <Stack.Screen name="LoadingSettingBuddyScreen" component={LoadingSettingBuddyScreen} />
                <Stack.Screen name="StudentsScreen" component={StudentsScreen} />
                <Stack.Screen name="BuddysScreen" component={BuddysScreen} />
                <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
                <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
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
                <Stack.Screen name="SupportScreen" component={SupportScreen} />
                <Stack.Screen name="BuddyProfileForIS" component={BuddyProfileForIS} />
                <Stack.Screen name="StudentProfileForBuddy" component={StudentProfileForBuddy} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="ArrivalBookingScreen" component={ArrivalBookingScreen} />
                <Stack.Screen name="ArrivalSubmitted" component={ArrivalSubmitted} />
                <Stack.Screen name="ArrivalBuddy" component={ArrivalBuddy} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
