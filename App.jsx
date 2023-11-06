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
import StudentProfileScreen from './components/2.3/StudentProfileScreen.jsx';
import ToDoListScreen from './components/2.3/ToDoListScreen.jsx';
import RouteScreen from './components/2.3/RouteScreen.jsx';
import InfoScreen from './components/2.3/InfoScreen.jsx';
import MessengerScreen from './components/2.3/MessengerScreen.jsx';
import ChangeLanguageScreen from './components/2.3/ChangeLanguageScreen.jsx';
import SettingScreen from './components/2.3/SettingScreen.jsx';
import LoadingSettingISScreen from './components/2.3/LoadingSettingISScreen.jsx';
import LoadingSettingBuddyScreen from './components/2.4/LoadingSettingBuddyScreen.jsx';


// import NotGetEmail from './components/Registration/EmailScreen/NotGetEmail.jsx';


const Stack = createNativeStackNavigator();

function App() {

    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Privet">
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen name="LogInForm" component={LogInForm} />
                <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="RegistrationISScreen" component={RegistrationISScreen} />
                <Stack.Screen name="RegistrationBuddyScreen" component={RegistrationBuddyScreen} />
                <Stack.Screen name="EmailScreen" component={EmailScreen} />
                <Stack.Screen name="StudentsScreen" component={StudentsScreen} />
                <Stack.Screen name="BuddysScreen" component={BuddysScreen} />
                <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
                <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
                <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
                <Stack.Screen name="ToDoListScreen" component={ToDoListScreen} />
                <Stack.Screen name="RouteScreen" component={RouteScreen} />
                <Stack.Screen name="InfoScreen" component={InfoScreen} />
                <Stack.Screen name="MessengerScreen" component={MessengerScreen} />
                <Stack.Screen name="ChangeLanguageScreen" component={ChangeLanguageScreen} />
                <Stack.Screen name="SettingScreen" component={SettingScreen} />
                <Stack.Screen name="LoadingSettingISScreen" component={LoadingSettingISScreen} />
                <Stack.Screen name="LoadingSettingBuddyScreen" component={LoadingSettingBuddyScreen} />


                {/* <Stack.Screen name="NotGetEmail" component={NotGetEmail} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
